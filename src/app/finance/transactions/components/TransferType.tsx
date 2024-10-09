import React from 'react'

interface TransferTypeProps {
  handleTransferType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  chosen: string
}

const TransferType: React.FC<TransferTypeProps> = ({ handleTransferType, chosen }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 ">
      <div className="w-full">
        <div className="flex items-center mb-4">
          <input
            id="individual"
            type="radio"
            value="individual"
            name="individualOrGroup"
            checked={chosen == 'individual'}
            className="w-4 h-4 text-app-purple border-gray-300  focus:ring-2"
            onChange={handleTransferType}
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Individuals
          </label>
        </div>


      </div>
      <div className="w-full">
        <div className="flex items-center mb-4">
          <input
            id="group"
            type="radio"
            value="group"
            name="individualOrGroup"
            checked={chosen == 'group'}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
            onChange={handleTransferType}
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Group
          </label>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center mb-4">
          <input
            id="group"
            type="radio"
            value="multi"
            name="individualOrGroup"
            checked={chosen == 'multi'}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
            onChange={handleTransferType}
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Multiple Users
          </label>
        </div>
      </div>
    </div>
  )
}

export default TransferType