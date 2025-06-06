import clsx from 'clsx';
import React from 'react';

type Log = {
  _id: string;
  walletAddress: string;
  collectionId: string;
  tradeParameters: {
    rankingPercentage: number;
    buyingPercentage: number;
    listPercentage: number;
  };
  floorPrice: number;
  nftsFound: number;
  nftsBought: number;
  nftsListed: number;
  logType: string;
  createdAt: string;
};

type ViewLogsProps = {
  logs: Log[];
};

const ViewLogs: React.FC<ViewLogsProps> = ({ logs }) => {
  return (
    <div className="w-full overflow-x-auto max-h-[80vh] p-4">
      <table className="min-w-full text-xs text-white border-collapse">
        <thead className="sticky top-0 z-10 bg-gray-800">
          <tr className="text-left">
            <th className="p-3">Time</th>
            <th className="p-3">Type</th>
            <th className="p-3">Wallet</th>
            <th className="p-3">Floor</th>
            <th className="p-3">Found</th>
            <th className="p-3">Bought</th>
            <th className="p-3">Listed</th>
            <th className="p-3">Buy %</th>
            <th className="p-3">List %</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              key={log._id}
              className="border-b border-gray-700 hover:bg-gray-800"
            >
              <td className="p-3 text-gray-400">
                {new Date(log.createdAt).toLocaleTimeString()}
              </td>
              <td>
                <span className="bg-gray-700 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded">
                  {log.logType}
                </span>
              </td>
              <td className="p-3 text-gray-300">
                {log.walletAddress.slice(0, 6)}...{log.walletAddress.slice(-4)}
              </td>
              <td className="p-3 text-gray-300">Ξ{log.floorPrice}</td>
              <td
                className={clsx(
                  'p-3',
                  log.nftsFound > 0 ? 'text-green-400 font-semibold' : 'text-gray-400'
                )}
              >
                {log.nftsFound}
              </td>
              <td
                className={clsx(
                  'p-3',
                  log.nftsBought > 0 ? 'text-amber-400 font-semibold' : 'text-gray-400'
                )}
              >
                {log.nftsBought}
              </td>
              <td
                className={clsx(
                  'p-3',
                  log.nftsListed > 0 ? 'text-cyan-400 font-semibold' : 'text-gray-400'
                )}
              >
                {log.nftsListed}
              </td>
              <td className="p-3 text-gray-300">
                {log.tradeParameters.buyingPercentage}%
              </td>
              <td className="p-3 text-gray-300">
                {log.tradeParameters.listPercentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLogs;
