import { Folder, MoreVertical } from 'lucide-react';
import React from 'react'

const Folders = () => {
     const folders = [
    { id: 1, name: 'PDFs', items: 45, modified: '2 hours ago', color: 'bg-purple-500', size: '2.1 GB' },
    { id: 2, name: 'Images', items: 238, modified: '1 day ago', color: 'bg-green-500', size: '15.6 GB' },
    { id: 3, name: 'Documents', items: 67, modified: '3 days ago', color: 'bg-blue-500', size: '456 MB' },
    { id: 4, name: 'Videos', items: 23, modified: '5 hours ago', color: 'bg-orange-500', size: '892 MB' }
  ];
  return (
  
      <div className="space-y-8 ">
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Folder className="w-5 h-5 mr-2 text-blue-600" />
                    Folders
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  xl:grid-cols-2 gap-4">
                    {folders.map(folder => (
                      <div
                        key={folder.id}
                        className={`group relative p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 `}
                        // onClick={() => toggleSelection(folder.id)}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-16 h-16 ${folder.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                            <Folder className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 truncate w-full mb-1">{folder.name}</span>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>{folder.items} items</div>
                            <div>{folder.size}</div>
                          </div>
                        </div>
                        <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 hover:bg-white/60 rounded-lg transition-all duration-200">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {/* {selectedItems.includes(folder.id) && (
                          <div className="absolute top-3 left-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>
        </div>
  )
}

export default Folders
