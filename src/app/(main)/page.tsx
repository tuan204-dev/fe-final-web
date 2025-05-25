"use client";

import { useAppSelector } from "@/redux/store";

const HomePage = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  console.log("currentUser", currentUser);

  return (
    <div className="flex flex-col mx-auto max-w-2xl gap-y-6 py-6">
      <div className="post-animation bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-gray-800">
            Beautiful sunset at the beach today! The colors were absolutely
            breathtaking. #nature #sunset
          </p>
        </div>

        <div className="w-full h-80 bg-gradient-to-r from-orange-300 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
          Sunset View
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="like-button flex items-center space-x-1 text-gray-500 hover:text-red-500 transition">
              <i className="far fa-heart"></i>
              <span className="text-sm">124</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <i className="far fa-comment"></i>
              <span className="text-sm">23</span>
            </button>
          </div>

          <button className="text-sm text-gray-500 hover:text-gray-700">
            <i className="far fa-bookmark"></i>
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="ml-2 text-sm font-medium text-blue-500 hover:text-blue-700">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="post-animation bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold">
            AS
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Alice Smith</p>
            <p className="text-xs text-gray-500">5 hours ago</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-gray-800">
            Just finished my latest design project! A complete brand identity
            for a new coffee shop. So excited to see it come to life! #design
            #branding
          </p>
        </div>

        <div className="w-full h-80 bg-gradient-to-r from-amber-200 to-yellow-400 flex items-center justify-center text-gray-800 text-2xl font-bold">
          Brand Design
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="like-button flex items-center space-x-1 text-gray-500 hover:text-red-500 transition">
              <i className="far fa-heart"></i>
              <span className="text-sm">89</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <i className="far fa-comment"></i>
              <span className="text-sm">14</span>
            </button>
          </div>

          <button className="text-sm text-gray-500 hover:text-gray-700">
            <i className="far fa-bookmark"></i>
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="ml-2 text-sm font-medium text-blue-500 hover:text-blue-700">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="post-animation bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
            EB
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Emma Brown</p>
            <p className="text-xs text-gray-500">1 day ago</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-gray-800">
            My new article is out! The Future of Sustainable Living - exploring
            how we can all make small changes for a big impact. Link in bio!
            #sustainability #writing
          </p>
        </div>

        <div className="w-full h-80 bg-gradient-to-r from-green-300 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold">
          Article Cover
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="like-button flex items-center space-x-1 text-gray-500 hover:text-red-500 transition">
              <i className="far fa-heart"></i>
              <span className="text-sm">156</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <i className="far fa-comment"></i>
              <span className="text-sm">32</span>
            </button>
          </div>

          <button className="text-sm text-gray-500 hover:text-gray-700">
            <i className="far fa-bookmark"></i>
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="ml-2 text-sm font-medium text-blue-500 hover:text-blue-700">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
