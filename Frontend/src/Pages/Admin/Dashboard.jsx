import React from 'react'
import { useDetails } from '../../context/UserContext'

function Dashboard() {
  const { user } = useDetails()

  return (
    <div className="min-h-screen w-full 
                    bg-gradient-to-b from-green-200 via-white via-green-200 to-white 
                    flex flex-col items-start pt-10">

      {/* Content Wrapper (1/3 viewport height) */}
      <div className="h-1/3 w-3/4 mx-auto 
                      bg-white/70 rounded-2xl shadow-lg 
                      flex flex-col items-center justify-center p-10 text-center">

        {/* Profile Image */}
        <div className="h-32 w-32 rounded-full bg-green-300 border-8 border-black flex items-center justify-center">
          {/* You can replace this with <img src={user?.profilePic} alt="profile" /> */}
        </div>

        {/* User Info */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-800">{user?.username}</h1>
          <p className="text-lg text-gray-700 mt-2">Total Earning</p>
        </div>

        {/* Create Course Button */}
        <button
          className="mt-6 px-6 py-3 
                     bg-gradient-to-r from-green-200 to-white 
                     text-gray-800 font-semibold rounded-full 
                     shadow-md border border-green-300 
                     hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Create Course
        </button>
      </div>
    </div>
  )
}

export default Dashboard
