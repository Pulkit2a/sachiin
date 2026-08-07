import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Heart,
  TrendingUp,
  Compass,
} from 'lucide-react';
import { sampleCommunityPosts } from '../../data/mockData';

export const CustomerCommunity: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'tips' | 'wellness' | 'updates'>('feed');

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] pb-8">
      {/* Top Header */}
      <div className="bg-[#0D182A] text-white pt-4 pb-4 px-4 rounded-b-3xl shadow-lg">
        <h1 className="font-heading font-bold text-lg text-white">Community Hub</h1>
        <p className="text-xs text-slate-300">Neighborhood tips, verified articles & wellness guides</p>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1 mt-3 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveSubTab('feed')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition-all text-center ${
              activeSubTab === 'feed' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Community Feed
          </button>
          <button
            onClick={() => setActiveSubTab('tips')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition-all text-center ${
              activeSubTab === 'tips' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tips & Articles
          </button>
          <button
            onClick={() => setActiveSubTab('wellness')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition-all text-center ${
              activeSubTab === 'wellness' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Wellness
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Neighborhood Highlights Carousel Banner */}
        <div className="bg-gradient-to-r from-amber-900 via-indigo-950 to-[#0D182A] text-white p-4 rounded-2xl border border-amber-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#F5C542] uppercase tracking-wider">
              HSR Layout Chapter
            </span>
            <h3 className="font-heading font-bold text-sm text-white mt-0.5">
              1,240 Homeowners Active
            </h3>
            <p className="text-[11px] text-slate-300">Share home maintenance questions with verified neighbors</p>
          </div>
          <Compass className="w-10 h-10 text-[#F5C542]/80" />
        </div>

        {/* Posts List */}
        {sampleCommunityPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3"
          >
            {/* Author Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-heading font-bold text-xs text-[#0D182A]">{post.authorName}</span>
                    {post.verifiedBadge && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{post.authorRole} • {post.timestamp}</span>
                </div>
              </div>

              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div>
              <h4 className="font-heading font-bold text-sm text-[#0D182A]">{post.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{post.content}</p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <button className="flex items-center gap-1 hover:text-[#0D182A]">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likesCount} Helpful</span>
              </button>

              <button className="flex items-center gap-1 hover:text-[#0D182A]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.commentsCount} Comments</span>
              </button>

              <button className="flex items-center gap-1 hover:text-[#0D182A]">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
