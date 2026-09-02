"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Folder,
  FolderOpen,
} from "lucide-react";

export default function SidebarNode({
  node,
  currentPath,
  level = 0,
}) {
  const hasChildren =
    node.children &&
    node.children.length > 0;

  const isActive =
    node.fullPath === currentPath;

  const isParentOfCurrent =
    currentPath.startsWith(node.fullPath);

  const [open, setOpen] = useState(
    isParentOfCurrent
  );

  useEffect(() => {
    if (isParentOfCurrent) {
      setOpen(true);
    }
  }, [isParentOfCurrent]);

  return (
    <li>

      <div
        className={`
          flex
          items-center
          justify-between
          rounded-lg
          transition
          ${
            isActive
              ? "bg-[#CB2D58] text-white"
              : "hover:bg-gray-100"
          }
        `}
      >

        <Link
          href={`/${node.fullPath}`}
          className="flex-1 flex items-center gap-2 px-3 py-2"
        >

          {open ? (
            <FolderOpen size={18} />
          ) : (
            <Folder size={18} />
          )}

          <span
            className={
              isActive
                ? "font-bold"
                : ""
            }
          >
            {node.title}
          </span>

        </Link>

        {hasChildren && (

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="p-2"
          >

            <ChevronDown
              size={18}
              className={`
                transition-transform
                duration-300
                ${
                  open
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>

        )}

      </div>

      {hasChildren && open && (

        <ul
          className="
            mr-5
            mt-2
            border-r
            border-gray-200
            pr-3
            space-y-1
          "
        >

          {node.children.map((child) => (

            <SidebarNode
              key={child._id}
              node={child}
              currentPath={currentPath}
              level={level + 1}
            />

          ))}

        </ul>

      )}

    </li>
  );
}