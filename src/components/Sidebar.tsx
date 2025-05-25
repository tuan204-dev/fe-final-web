import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed top-16 left-0 h-[calc(100vh-56px)]">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Online Friends
        </h2>

        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-120px)]">
          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>JD</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Photographer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>AS</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Alice Smith</p>
              <p className="text-xs text-gray-500">Designer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>MJ</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Mike Johnson</p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>EB</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Emma Brown</p>
              <p className="text-xs text-gray-500">Writer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>DW</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">David Wilson</p>
              <p className="text-xs text-gray-500">Musician</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>SG</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Sarah Green</p>
              <p className="text-xs text-gray-500">Chef</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>JD</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Photographer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>AS</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Alice Smith</p>
              <p className="text-xs text-gray-500">Designer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>MJ</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Mike Johnson</p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>EB</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Emma Brown</p>
              <p className="text-xs text-gray-500">Writer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>DW</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">David Wilson</p>
              <p className="text-xs text-gray-500">Musician</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>SG</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Sarah Green</p>
              <p className="text-xs text-gray-500">Chef</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>JD</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Photographer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>AS</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Alice Smith</p>
              <p className="text-xs text-gray-500">Designer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>MJ</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Mike Johnson</p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>EB</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Emma Brown</p>
              <p className="text-xs text-gray-500">Writer</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>DW</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">David Wilson</p>
              <p className="text-xs text-gray-500">Musician</p>
            </div>
          </div>

          <div className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="relative">
              <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 flex items-center justify-center text-white font-semibold transition duration-300">
                <span>SG</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Sarah Green</p>
              <p className="text-xs text-gray-500">Chef</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
