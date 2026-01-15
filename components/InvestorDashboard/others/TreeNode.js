"use client";

import { useState, useCallback, memo, useEffect } from "react";
import {
  CaretDown,
  CaretRight,
  User,
  Copy,
  Check,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

const NODES_PER_BATCH = 10;

const TreeNode = memo(
  ({
    node,
    level = 0,
    isRoot = false,
    isExpanded = false,
    onToggleExpand,
    expandedNodes = {},
  }) => {
    const [copied, setCopied] = useState(false);
    const [visibleChildren, setVisibleChildren] = useState([]);
    const [showMoreCount, setShowMoreCount] = useState(0);

    const hasChildren = node.children && node.children.length > 0;
    const nodeId = node.userId;

    // Initialize visible children when node expands
    useEffect(() => {
      if (isExpanded && hasChildren) {
        const initialBatch = node.children.slice(0, NODES_PER_BATCH);
        setVisibleChildren(initialBatch);
        setShowMoreCount(Math.max(0, node.children.length - NODES_PER_BATCH));
      }
    }, [isExpanded, hasChildren, node.children]);

    const toggleExpand = useCallback(() => {
      onToggleExpand(nodeId);
    }, [onToggleExpand, nodeId]);

    const copyReferralCode = useCallback(() => {
      navigator.clipboard.writeText(node.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [node.referralCode]);

    const loadMoreChildren = useCallback(() => {
      const currentCount = visibleChildren.length;
      const nextBatch = node.children.slice(
        currentCount,
        currentCount + NODES_PER_BATCH
      );

      setVisibleChildren((prev) => [...prev, ...nextBatch]);
      setShowMoreCount(
        Math.max(0, node.children.length - (currentCount + NODES_PER_BATCH))
      );
    }, [node.children, visibleChildren.length]);

    // Calculate indentation based on level
    const indentClass = isRoot ? "" : `ml-${Math.min(level * 4, 12)}`;

    return (
      <div className={`${indentClass} transition-all duration-200`}>
        <div
          className={`flex items-center p-3 my-1 rounded-md hover:bg-greyBg ${
            isRoot ? "bg-formPrimary-50" : ""
          }`}
        >
          <div className="flex items-center flex-1 min-w-0">
            {hasChildren ? (
              <button
                onClick={toggleExpand}
                className="mr-2 text-grey hover:text-gray-700 focus:outline-none"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <CaretDown size={16} />
                ) : (
                  <CaretRight size={16} />
                )}
              </button>
            ) : (
              <span className="mr-2 w-4"></span>
            )}

            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isRoot
                  ? "bg-formPrimary-100 text-secondary-600"
                  : "bg-greyBg text-grey"
              }`}
            >
              <User size={16} weight="bold" />
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {node.name}
              </p>
              <p className="text-xs text-grey truncate">{node.email}</p>
            </div>
          </div>

          <div className="flex items-center ml-2">
            <div className="flex items-center bg-greyBg rounded-md px-2 py-1">
              <span className="text-xs text-grey mr-1">
                Code: {node.referralCode}
              </span>
              <button
                onClick={copyReferralCode}
                className="text-grey hover:text-gray-700 focus:outline-none"
                aria-label="Copy referral code"
              >
                {copied ? (
                  <Check size={14} className="text-secondary" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="border-l-2 border-borderColor ml-4 pl-2">
            {visibleChildren.map((child) => (
              <TreeNode
                key={child.userId}
                node={child}
                level={level + 1}
                isExpanded={expandedNodes[child.userId]}
                onToggleExpand={onToggleExpand}
                expandedNodes={expandedNodes}
              />
            ))}

            {showMoreCount > 0 && (
              <button
                onClick={loadMoreChildren}
                className="flex items-center gap-2 ml-4 mt-2 mb-2 text-sm text-secondary-600 hover:text-secondary-800"
              >
                <Plus size={16} />
                <span>
                  Load {Math.min(showMoreCount, NODES_PER_BATCH)} more (
                  {showMoreCount} remaining)
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

TreeNode.displayName = "TreeNode";

export default TreeNode;
