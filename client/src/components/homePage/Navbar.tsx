import { HardDrive, Upload, User } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <div>
       <header className="bg-gray-200  border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">CloudStorage</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <HardDrive className="w-4 h-4" />
              <span>2.4 GB used of 15 GB</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
