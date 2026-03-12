'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import { comparisonData } from '@/data/comparison';

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <div className="md:hidden">
      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-stone-200 mb-6">
        <button
          onClick={() => setActiveTab('before')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'before'
              ? 'bg-red-800 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          Trước khi có Đảng
        </button>
        <button
          onClick={() => setActiveTab('after')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'after'
              ? 'bg-emerald-700 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          Sau khi có Đảng
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {comparisonData.map((row, i) => (
          <motion.div
            key={`${activeTab}-${i}`}
            initial={{ opacity: 0, x: activeTab === 'before' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm"
          >
            <h4 className="font-heading text-sm font-bold text-stone-800 mb-2">{row.criteria}</h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {activeTab === 'before' ? row.before : row.after}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
