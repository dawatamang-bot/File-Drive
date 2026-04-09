"use client"

import { useState } from "react"
import { mockFiles, mockFolders } from "../lib/mock-data"
import { Button } from "~/components/ui/button"
import { FileRow, FolderRow } from "./file-row"
import { ChevronRight, Upload } from "lucide-react"

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root")

  // ✅ Get files in current folder
  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  // ✅ Get folders in current folder
  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder)
  }

  // ✅ Handle folder click
  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  // ✅ Breadcrumbs (ROOT REMOVED)
  const getBreadcrumbs = () => {
    const breadcrumbs = []
    let currentId: string | null = currentFolder

    while (currentId !== null) {
      const folder = mockFolders.find((f) => f.id === currentId)

      if (folder) {
        // ❌ Skip root
        if (folder.id !== "root") {
          breadcrumbs.unshift(folder)
        }
        currentId = folder.parent
      } else {
        break
      }
    }

    return breadcrumbs
  }

  // ✅ Upload handler
  const handleUpload = () => {
    alert("Upload functionality would be implemented here")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* 🔹 Header */}
        <div className="flex justify-between items-center mb-6">

          {/* 🔹 Navigation */}
          <div className="flex items-center">

            {/* My Drive (Root) */}
            <Button
              onClick={() => setCurrentFolder("root")}
              variant="ghost"
              className="text-gray-300 hover:text-white mr-2 font-semibold"
            >
              My Drive
            </Button>

            {/* Breadcrumbs */}
            {getBreadcrumbs().map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>

        {/* 🔹 File Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl">

          {/* Header Row */}
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>

          {/* Content */}
          <ul>

            {/* Folders */}
            {getCurrentFolders().map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => handleFolderClick(folder.id)}
              />
            ))}

            {/* Files */}
            {getCurrentFiles().map((file) => (
              <FileRow key={file.id} file={file} />
            ))}

          </ul>
        </div>
      </div>
    </div>
  )
}