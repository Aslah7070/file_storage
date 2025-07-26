
"use client"
import { useAuthStore } from '@/lib/stores/useAuthStore'
import { HardDrive, Upload, User } from 'lucide-react'


import Signup from '../auth/Signup'
import { ReusableDialog } from '../ui/modal'
import Login from '../auth/Login'
import  ReusableMenu  from '../ui/dropdown'

const Navbar = () => {
  const {user}=useAuthStore()


  return (
    <div>
    
       <header className="bg-gray-200  border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">File Storage</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <HardDrive className="w-4 h-4" />
              <span>2.4 GB used of 15 GB</span>
            </div>
          </div>
          {
            user&&(
              <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
        
               <ReusableMenu
      buttonLabel={<User/>}
      menuItems={[
        { label: "Profile", onClick: () => console.log("Profile clicked") },
        { label: "My account", onClick: () => console.log("Account clicked") },
        { label: "Logout", onClick: () => console.log("Logout clicked") },
      ]}
    />
           
          </div>
            )
          }
          {
            !user&&(
                 <div className='space-x-4'>
             <ReusableDialog triggerText="Login" >
      <Login/>
     </ReusableDialog>
                <ReusableDialog triggerText="Signup" >
      <Signup/>
     </ReusableDialog>
            </div>
            )
          }
        </div>
      </header>
    </div>
  )
}

export default Navbar
