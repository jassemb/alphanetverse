import React, { useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight, FiChevronDown, FiUser, FiZoomIn, FiZoomOut } from "react-icons/fi";
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
    <div className="select-none flex flex-col items-center w-full">
      <div
        className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] cursor-pointer"
        onClick={toggleExpand}
        aria-expanded={isExpanded}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          {node.imageUrl ? (
            <Image
              src={node.imageUrl}
              alt={node.name}
              className="w-full h-full object-cover"
              width={40}
              height={40}
            />
          ) : (
            <FiUser className="w-full h-full p-2 text-gray-600" />
          )}
        </div>
        <div className="ml-3 truncate w-full">
          <div className="font-medium text-gray-900 truncate flex items-center">
            <span className="truncate">{node.name}</span>
            {node.attributes?.is_active === "Yes" && (
              <div className="ml-2 p-1 rounded-full bg-green-500">
                <BsShieldFillCheck className="text-kellygreen text-lg" />
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
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center min-w-max">
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
  const [zoom, setZoom] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchUserTree = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User is not authenticated.");
        router.push("/");
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
          setUserTree(data);

          // **Calculate zoom level dynamically**
          const depth = calculateDepth(data);
          const width = data.children?.length || 1;
          let newZoom = 1 - Math.min(depth * 0.05 + width * 0.02, 0.5); // Max zoom-out = 0.5
          setZoom(Math.max(newZoom, 0.5)); // Ensure zoom doesn't go too low
        } else {
          console.error("Error fetching user tree data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user tree:", error);
      }
    };

    fetchUserTree();
  }, [router]);

  // Recursive function to calculate tree depth
  const calculateDepth = (node: any): number => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + Math.max(...node.children.map(calculateDepth));
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="w-100 h-full p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        User Network Tree
      </h2>

      {/* Zoom Controls */}
      <div className="flex justify-center  space-x-3">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all"
        >
          <FiZoomOut className="text-xl" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all"
        >
          <FiZoomIn className="text-xl" />
        </button>
      </div>

      {/* Wrapper for zooming */}
      <div className=" overflow-hidden flex justify-center items-center">
        <div
          className="flex justify-center transform origin-top transition-all"
          style={{ transform: `scale(${zoom})` }}
        >
          {userTree ? <TreeNode node={userTree} level={0} /> : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default UserMatrixTree;
