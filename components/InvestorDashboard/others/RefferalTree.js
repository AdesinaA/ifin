"use client";

import axios from "axios";

import { useState, useEffect, useCallback, useMemo } from "react";
import TreeNode from "./TreeNode";
import TreeSkeleton from "./TreeSkeleton";
import {
  MagnifyingGlass,
  TreeStructure,
  List,
  User,
  Copy,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import debounce from "@/hooks/Debounce";
import GeneralLoader from "@/components/GenreralLoader";

export default function ReferralTree({ data }) {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [viewMode, setViewMode] = useState("tree"); // 'tree' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [flattenedNodes, setFlattenedNodes] = useState([]);
  const NODES_PER_PAGE = 20;

  const token = data?.accessToken;
  const id = data?.user?.id;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/dashboard/refferalTree`;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
          ID: id,
        },
      };

      try {
        const response = await axios.request(config);

        const data = response?.data?.data;

        // Initialize expanded state for root node
        setExpandedNodes((prev) => ({
          ...prev,
          [data.tree.userId]: true,
        }));

        setTreeData(data.tree);
        setFilteredData(data.tree);

        // Create flattened version of the tree for list view
        const flattened = flattenTree(data.tree);
        setFlattenedNodes(flattened);

        setLoading(false);

        // return response.data;
      } catch (error) {
        console.error("Error fetching referral tree:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Flatten tree into array for list view and pagination
  const flattenTree = useCallback((node, level = 0, path = []) => {
    if (!node) return [];

    const currentPath = [...path, node.userId];
    const result = [
      {
        ...node,
        level,
        path: currentPath,
      },
    ];

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        result.push(...flattenTree(child, level + 1, currentPath));
      });
    }

    return result;
  }, []);

  // Toggle node expansion
  const toggleNodeExpansion = useCallback((nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  }, []);

  // Debounced search to prevent excessive re-renders
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        if (!treeData) return;

        if (!term.trim()) {
          setFilteredData(treeData);
          // Reset flattened nodes to full tree
          setFlattenedNodes(flattenTree(treeData));
          return;
        }

        // Search function that traverses the tree
        const searchTree = (node, term) => {
          const lowerTerm = term.toLowerCase();
          const matchesSearch =
            node.name.toLowerCase().includes(lowerTerm) ||
            node.email.toLowerCase().includes(lowerTerm) ||
            node.referralCode.toLowerCase().includes(lowerTerm);

          // If this node matches, return it with empty children array (to be filled later if needed)
          if (matchesSearch) {
            return { ...node, children: node.children || [] };
          }

          // Check children
          if (node.children && node.children.length > 0) {
            const matchingChildren = node.children
              .map((child) => searchTree(child, term))
              .filter(Boolean);

            if (matchingChildren.length > 0) {
              return { ...node, children: matchingChildren };
            }
          }

          return null;
        };

        const result = searchTree(treeData, term);
        setFilteredData(result || { ...treeData, children: [] });

        // Update flattened nodes for list view based on search results
        if (result) {
          setFlattenedNodes(flattenTree(result));
        } else {
          setFlattenedNodes([]);
        }

        // Reset to first page when searching
        setCurrentPage(1);
      }, 300),
    [treeData, flattenTree]
  );

  // Handle search input
  const handleSearch = useCallback(
    (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      debouncedSearch(term);
    },
    [debouncedSearch]
  );

  // Toggle view mode between tree and list
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "tree" ? "list" : "tree"));
    setCurrentPage(1);
  }, []);

  // Calculate pagination
  const totalPages = useMemo(
    () => Math.ceil(flattenedNodes.length / NODES_PER_PAGE),
    [flattenedNodes.length]
  );

  const paginatedNodes = useMemo(
    () =>
      flattenedNodes.slice(
        (currentPage - 1) * NODES_PER_PAGE,
        currentPage * NODES_PER_PAGE
      ),
    [flattenedNodes, currentPage]
  );

  // Handle page change
  const changePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (loading) {
    return <TreeSkeleton />;
  }

  const ListNodeItem = ({ node }) => {
    const [copied, setCopied] = useState(false);

    const copyReferralCode = useCallback(() => {
      navigator.clipboard.writeText(node.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [node.referralCode]);

    return (
      <div
        className={`flex items-center p-3 rounded-md hover:bg-gray-50 border-l-4 ${
          node.level === 0
            ? "border-blue-500"
            : `border-gray-${Math.min(300 + node.level * 100, 500)}`
        }`}
      >
        <div className="flex items-center flex-1 min-w-0">
          <div
            className={`ml-${Math.min(
              node.level * 2,
              12
            )} flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              node.level === 0
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <User size={16} weight="bold" />
          </div>

          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {node.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{node.email}</p>
          </div>
        </div>

        <div className="flex items-center ml-2">
          <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
            <span className="text-xs text-gray-600 mr-1">
              Code: {node.referralCode}
            </span>
            <button
              onClick={copyReferralCode}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Copy referral code"
            >
              {copied ? (
                <Check size={14} className="text-blue" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  ListNodeItem.displayName = "ListNodeItem";

  // Helper function to count total referrals
  function countReferrals(node) {
    if (!node) return 0;

    let count = node.children ? node.children.length : 0;

    if (node.children) {
      node.children.forEach((child) => {
        count += countReferrals(child);
      });
    }

    return count;
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlass size={20} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search by name, email or referral code..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={toggleViewMode}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          {viewMode === "tree" ? (
            <>
              <List size={20} />
              <span>List View</span>
            </>
          ) : (
            <>
              <TreeStructure size={20} />
              <span>Tree View</span>
            </>
          )}
        </button>
      </div> */}

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        {viewMode === "tree" ? (
          <div className="min-w-max">
            {filteredData ? (
              <TreeNode
                node={filteredData}
                level={0}
                isRoot={true}
                isExpanded={expandedNodes[filteredData.userId]}
                onToggleExpand={toggleNodeExpansion}
                expandedNodes={expandedNodes}
              />
            ) : (
              <p className="text-gray-500">No referral data available.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedNodes.length > 0 ? (
              <>
                <div className="space-y-2">
                  {paginatedNodes.map((node) => (
                    <ListNodeItem key={node.userId} node={node} />
                  ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => changePage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Show limited page numbers with ellipsis
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 &&
                            pageNum <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => changePage(pageNum)}
                              className={`w-8 h-8 rounded-full ${
                                currentPage === pageNum
                                  ? "bg-blue-500 text-white"
                                  : "border border-gray-300"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          (pageNum === 2 && currentPage > 3) ||
                          (pageNum === totalPages - 1 &&
                            currentPage < totalPages - 2)
                        ) {
                          return <span key={pageNum}>...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() =>
                        changePage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">No referrals match your search.</p>
            )}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Total referrals: {countReferrals(treeData)}</p>
      </div>
    </div>
  );
}
