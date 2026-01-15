"use client";

import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import TreeNode from "./TreeNode";
import TreeSkeleton from "./TreeSkeleton";
import { User, Copy, Check } from "@phosphor-icons/react/dist/ssr";
import debounce from "@/hooks/Debounce";

export default function ReferralTree({ data }) {
  const [treeData, setTreeData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [flattenedNodes, setFlattenedNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("tree"); // tree | list
  const [currentPage, setCurrentPage] = useState(1);

  const NODES_PER_PAGE = 20;

  const token = data?.accessToken;
  const userId = data?.user?.id;

  /* ============================================================================
     FETCH REFERRAL TREE (SAFE)
  ============================================================================ */
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(`/api/dashboard/refferalTree`, {
          headers: {
            Authorization: `Bearer ${token}`,
            ID: userId,
          },
        });

        const payload = response?.data?.data;

        // 🛑 HARD GUARD (CRITICAL FIX)
        if (!payload || !payload.tree || !payload.tree.userId) {
          console.warn("Invalid referral tree payload:", payload);
          setTreeData(null);
          setFilteredData(null);
          setFlattenedNodes([]);
          setLoading(false);
          return;
        }

        // ✅ SAFE INITIALIZATION
        setTreeData(payload.tree);
        setFilteredData(payload.tree);

        setExpandedNodes({
          [payload.tree.userId]: true,
        });

        setFlattenedNodes(flattenTree(payload.tree));
        setLoading(false);
      } catch (error) {
        console.error("Referral tree fetch failed:", error);
        setTreeData(null);
        setFilteredData(null);
        setFlattenedNodes([]);
        setLoading(false);
      }
    };

    fetchTree();
  }, [token, userId]);

  /* ============================================================================
     FLATTEN TREE (LIST VIEW)
  ============================================================================ */
  const flattenTree = useCallback((node, level = 0, path = []) => {
    if (!node) return [];

    const currentPath = [...path, node.userId];
    let result = [{ ...node, level, path: currentPath }];

    if (node.children?.length) {
      node.children.forEach((child) => {
        result = result.concat(flattenTree(child, level + 1, currentPath));
      });
    }

    return result;
  }, []);

  /* ============================================================================
     EXPAND / COLLAPSE
  ============================================================================ */
  const toggleNodeExpansion = useCallback((nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  }, []);

  /* ============================================================================
     SEARCH (DEBOUNCED)
  ============================================================================ */
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        if (!treeData) return;

        if (!term.trim()) {
          setFilteredData(treeData);
          setFlattenedNodes(flattenTree(treeData));
          return;
        }

        const searchTree = (node) => {
          const match =
            node.name.toLowerCase().includes(term) ||
            node.email.toLowerCase().includes(term) ||
            node.referralCode.toLowerCase().includes(term);

          if (match) return node;

          if (node.children?.length) {
            const children = node.children
              .map(searchTree)
              .filter(Boolean);

            if (children.length) {
              return { ...node, children };
            }
          }

          return null;
        };

        const result = searchTree(treeData);
        setFilteredData(result);
        setFlattenedNodes(result ? flattenTree(result) : []);
        setCurrentPage(1);
      }, 300),
    [treeData, flattenTree]
  );

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    debouncedSearch(term);
  };

  /* ============================================================================
     PAGINATION (LIST MODE)
  ============================================================================ */
  const totalPages = Math.ceil(flattenedNodes.length / NODES_PER_PAGE);

  const paginatedNodes = flattenedNodes.slice(
    (currentPage - 1) * NODES_PER_PAGE,
    currentPage * NODES_PER_PAGE
  );

  /* ============================================================================
     LIST ITEM
  ============================================================================ */
  const ListNodeItem = ({ node }) => {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
      navigator.clipboard.writeText(node.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-greyBg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-greyBg rounded-full flex items-center justify-center">
            <User size={14} />
          </div>
          <div>
            <p className="text-sm font-medium">{node.name}</p>
            <p className="text-xs text-grey">{node.email}</p>
          </div>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1 text-xs text-grey"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {node.referralCode}
        </button>
      </div>
    );
  };

  /* ============================================================================
     COUNT NETWORK SIZE
  ============================================================================ */
  const countReferrals = (node) => {
    if (!node) return 0;
    return (
      (node.children?.length || 0) +
      node.children?.reduce((a, c) => a + countReferrals(c), 0)
    );
  };

  /* ============================================================================
     RENDER
  ============================================================================ */
  if (loading) return <TreeSkeleton />;

  return (
    <div className="space-y-6">
      <input
        type="search"
        placeholder="Search by name, email or code"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />

      <div className="bg-backgroundPrimary rounded-lg p-5 shadow-sm">
        {viewMode === "tree" ? (
          filteredData?.userId ? (
            <TreeNode
              node={filteredData}
              level={0}
              isRoot
              isExpanded={expandedNodes[filteredData.userId]}
              expandedNodes={expandedNodes}
              onToggleExpand={toggleNodeExpansion}
            />
          ) : (
            <p className="text-grey">No referral data available.</p>
          )
        ) : (
          <>
            {paginatedNodes.map((node) => (
              <ListNodeItem key={node.userId} node={node} />
            ))}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <p className="text-sm text-grey">
        Total network size: {countReferrals(treeData)}
      </p>
    </div>
  );
}
