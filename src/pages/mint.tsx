'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bot, Percent, Power, PowerOff, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const api = {
  // Fetch bot data
  async fetchBotData() {
    // Replace with your actual API endpoint
    const response = await fetch('/api/bot/status');
    if (!response.ok) {
      throw new Error('Failed to fetch bot data');
    }
    return response.json();
  },

  // Toggle bot status
  async toggleBotStatus(isActive) {
    // Replace with your actual API endpoint
    const response = await fetch('/api/bot/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive }),
    });
    if (!response.ok) {
      throw new Error('Failed to toggle bot status');
    }
    return response.json();
  },

  // Update bot settings
  async updateBotSettings(settings) {
    // Replace with your actual API endpoint
    const response = await fetch('/api/bot/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update bot settings');
    }
    return response.json();
  },
};

const useBotData = () => {
  const queryClient = useQueryClient();

  // Fetch bot data
  const { data, isLoading, error } = useQuery({
    queryKey: ['botData'],
    queryFn: api.fetchBotData,
    // Fallback data for development
    initialData: {
      rarity: 15.5,
      floor: 2.3,
      isActive: false,
      rarityThreshold: 20,
      floorThreshold: 50,
    },
  });

  // Toggle bot mutation
  const toggleMutation = useMutation({
    mutationFn: api.toggleBotStatus,
    onSuccess: (newData) => {
      // Update the cache with new data
      queryClient.setQueryData(['botData'], (oldData) => ({
        ...oldData,
        ...newData,
      }));
    },
    onError: (error) => {
      console.error('Error toggling bot:', error);
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: api.updateBotSettings,
    onSuccess: (newData) => {
      queryClient.setQueryData(['botData'], (oldData) => ({
        ...oldData,
        ...newData,
      }));
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
    },
  });

  return {
    data,
    isLoading,
    error,
    toggleBot: (isActive) => toggleMutation.mutate(isActive),
    updateSettings: (settings) => updateSettingsMutation.mutate(settings),
    isToggling: toggleMutation.isPending,
    isUpdating: updateSettingsMutation.isPending,
  };
};

// Main Mint Component
function MintComponent() {
  const {
    data,
    isLoading,
    error,
    toggleBot,
    updateSettings,
    isToggling,
    isUpdating,
  } = useBotData();
  const [rarityThreshold, setRarityThreshold] = useState(
    data?.rarityThreshold || 20
  );
  const [floorThreshold, setFloorThreshold] = useState(
    data?.floorThreshold || 50
  );

  // Handle threshold changes with debouncing
  const handleRarityChange = (value) => {
    setRarityThreshold(value);
    // Debounce API call
    // setTimeout(() => {
    //   updateSettings({ rarityThreshold: value, floorThreshold });
    // }, 500);
  };

  const handleFloorChange = (value) => {
    setFloorThreshold(value);
    // Debounce API call
    // setTimeout(() => {
    //   updateSettings({ rarityThreshold, floorThreshold: value });
    // }, 500);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-white text-xl'>Loading bot data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-red-400 text-xl'>Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen mint-bg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='relative'>
        {/* Animated background glow */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse'></div>

        {/* Main container */}
        <div className='relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl min-w-[600px]'>
          {/* Header */}
          <div className='flex items-center justify-center mb-8'>
            <div className='flex items-center gap-3'>
              <Bot className='w-8 h-8 text-cyan-400' />
              <h1 className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                BUY BOT 1
              </h1>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 gap-6 mb-8'>
            {/* Rarity Card */}
            <div className='bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20'>
              <div className='flex items-center gap-3 mb-4'>
                <TrendingUp className='w-5 h-5 text-purple-400' />
                <span className='text-purple-300 font-medium'>RARITY</span>
              </div>
              <div className='space-y-3'>
                <div className='text-2xl font-bold text-white'>
                  {data?.rarity || 0}%
                </div>
                <div className='space-y-2'>
                  <label className='text-sm text-gray-300'>Threshold</label>
                  <div className='relative'>
                    <input
                      type='range'
                      min='1'
                      max='100'
                      value={rarityThreshold}
                      onChange={(e) =>
                        handleRarityChange(Number(e.target.value))
                      }
                      disabled={isUpdating}
                      className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
                    />
                    <div className='flex justify-between text-xs text-gray-400 mt-1'>
                      <span>1%</span>
                      <span className='font-medium text-purple-300'>
                        {rarityThreshold}%
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floor Card */}
            <div className='bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20'>
              <div className='flex items-center gap-3 mb-4'>
                <Percent className='w-5 h-5 text-cyan-400' />
                <span className='text-cyan-300 font-medium'>FLOOR</span>
              </div>
              <div className='space-y-3'>
                <div className='text-2xl font-bold text-white'>
                  {data?.floor || 0}%
                </div>
                <div className='space-y-2'>
                  <label className='text-sm text-gray-300'>Threshold</label>
                  <div className='relative'>
                    <input
                      type='range'
                      min='1'
                      max='100'
                      step='1'
                      value={floorThreshold}
                      onChange={(e) =>
                        handleFloorChange(Number(e.target.value))
                      }
                      disabled={isUpdating}
                      className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
                    />
                    <div className='flex justify-between text-xs text-gray-400 mt-1'>
                      <span>1%</span>
                      <span className='font-medium text-cyan-300'>
                        {floorThreshold}%
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activation Controls */}
          <div className='space-y-4'>
            <div className='text-center text-gray-300 font-medium mb-4'>
              Bot Status:{' '}
              {data?.isActive ? (
                <span className='text-green-400 font-bold'>ACTIVE</span>
              ) : (
                <span className='text-red-400 font-bold'>INACTIVE</span>
              )}
            </div>

            <div className='flex gap-4'>
              {/* Activate ON */}
              <button
                onClick={() => toggleBot(true)}
                disabled={data?.isActive || isToggling}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  data?.isActive || isToggling
                    ? 'bg-green-500/20 text-green-300 border-2 border-green-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25 transform hover:scale-105'
                }`}
              >
                <Power className='w-6 h-6' />
                {isToggling ? 'ACTIVATING...' : 'ACTIVATE ON'}
              </button>

              {/* Activate OFF */}
              <button
                onClick={() => toggleBot(false)}
                disabled={!data?.isActive || isToggling}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  !data?.isActive || isToggling
                    ? 'bg-red-500/20 text-red-300 border-2 border-red-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-red-500/25 transform hover:scale-105'
                }`}
              >
                <PowerOff className='w-6 h-6' />
                {isToggling ? 'DEACTIVATING...' : 'ACTIVATE OFF'}
              </button>
            </div>
          </div>

          {/* Status Indicator */}
          <div className='mt-6 flex items-center justify-center'>
            <div
              className={`w-3 h-3 rounded-full ${
                data?.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              } mr-2`}
            ></div>
            <span className='text-sm text-gray-300'>
              {data?.isActive
                ? 'Bot is monitoring and ready to buy'
                : 'Bot is currently inactive'}
            </span>
          </div>

          {/* Loading indicator for updates */}
          {isUpdating && (
            <div className='mt-4 text-center text-yellow-400 text-sm'>
              Updating settings...
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </div>
  );
}

// Main component with QueryClient provider
export default function Mint() {
  return <MintComponent />;
}
