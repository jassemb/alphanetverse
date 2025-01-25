"use client";
import React, { useState, useCallback, memo } from "react";
import { FiChevronRight, FiChevronDown, FiUser } from "react-icons/fi";

// Mock data
const mockData = {
  id: 1,
  name: "John Smith",
  role: "CEO",
  imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  children: [
    {
      id: 2,
      name: "Sarah Johnson",
      role: "CTO",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      children: [
        {
          id: 4,
          name: "Mike Wilson",
          role: "Tech Lead",
          imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          children: []
        },
        {
          id: 5,
          name: "Lisa Brown",
          role: "Senior Developer",
          imageUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909",
          children: []
        }
      ]
    },
    {
      id: 3,
      name: "David Chen",
      role: "CFO",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      children: [
        {
          id: 6,
          name: "Emma Davis",
          role: "Finance Manager",
          imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
          children: []
        }
      ]
    }
  ]
};

type TreeNodeProps = {
  node: typeof mockData;
  level: number;
};

const TreeNode: React.FC<TreeNodeProps> = memo(({ node, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none flex flex-col items-center">
      {/* Node */}
      <div
        className={`flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 ${
          level === 0 ? "bg-blue-50" : ""
        } border-2 border-gray-200 shadow-sm min-w-[200px]`}
        role="button"
        tabIndex={0}
        onClick={toggleExpand}
        onKeyPress={(e) => e.key === "Enter" && toggleExpand()}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center flex-1 min-w-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {node.imageUrl ? (
              <img
                src={node.imageUrl}
                alt={node.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = "";
                }}
              />
            ) : (
              <FiUser className="w-full h-full p-2 text-gray-600" />
            )}
          </div>
          <div className="ml-3 truncate">
            <div className="font-medium text-gray-900 truncate">{node.name}</div>
            <div className="text-sm text-gray-500 truncate">{node.role}</div>
          </div>
        </div>
        {hasChildren && (
          <span className="text-gray-500 ml-2">
            {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        )}
      </div>

      {/* Vertical Line */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-10 bg-black"></div>          {/* Line to children */}

          {/* Children */}
          <div className="flex gap-8 relative">
            {node.children.map((child, index) => (
              <div key={child.id} className="flex flex-col items-center relative">
                {/* Horizontal Line */}
                {index > 0 && (
                  <div className="absolute-left-4 top-3 w-8 h-px bg-gray-300"></div>
                )}
                <TreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const UserMatrixTree: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        your Network
      </h2>
      <div className="min-w-[300px] flex justify-center">
        <TreeNode node={mockData} level={0} />
      </div>
    </div>
  );
};

export default UserMatrixTree;

