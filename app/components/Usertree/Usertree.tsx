import React, { useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight, FiChevronDown, FiUser } from "react-icons/fi";
import { BsShieldFillCheck } from "react-icons/bs";
import Image from "next/image";

type TreeNodeProps = {
  node: any;
  level: number;
};

const TreeNode: React.FC<TreeNodeProps> = memo(({ node, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  TreeNode.displayName = "TreeNode";
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none flex flex-col items-center">
      <div
        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
        onClick={toggleExpand}
        aria-expanded={isExpanded}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          {node.imageUrl ? (
            <Image
              src={node.imageUrl}
              alt={node.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FiUser className="w-full h-full p-2 text-gray-600" />
          )}
        </div>
        <div className="ml-3 truncate">
          <div className="font-medium text-gray-900 truncate flex items-center">
            <span>{node.name}</span>
            {node.attributes?.is_active === "Yes" && (
              <div
                className="ml-2 p-1 rounded-full"
                style={{ backgroundColor: "green" }}
              >
                <BsShieldFillCheck className="text-white text-lg" />
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 truncate">{node.role}</div>
        </div>
        {hasChildren && (
          <span className="text-gray-500 ml-2">
            {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        )}
      </div>

      {/* Render Children */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center mt-3">
          <div className="w-0.5 h-10 bg-black"></div>
          <div className="flex gap-8 relative">
            {node.children.map((child: any, index: number) => (
              <div key={child.id || `node-${index}`} className="flex flex-col items-center">
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
  const [userTree, setUserTree] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserTree = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User is not authenticated.");
        router.push("/"); // Redirect to login if token is not available
        return;
      }

      try {
        const response = await fetch("https://api.alphanetverse.com/api/v1/tree/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User tree:", data);
          setUserTree(data); // Update state with the user tree data
        } else {
          console.error("Error fetching user tree data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user tree:", error);
      }
    };

    fetchUserTree();
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        User Network Tree
      </h2>
      <div className="min-w-[300px] flex justify-center">
        {userTree ? (
          <TreeNode node={userTree} level={0} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default UserMatrixTree;