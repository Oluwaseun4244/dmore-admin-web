import Button from '@/app/components/generic/Button';
import React, { useState } from 'react'
import { useTopUp } from '../hooks/useTopUp';
import { getSession } from 'next-auth/react';
import { useGetQuery } from '@/app/utils/apiUtils';
import { ProfileResponse } from '@/app/types/auth.types';
import { CreateInflowPayload } from '../types/inflow.types';
import { useAlert } from '@/lib/features/alert/useAlert';
import { PROVIDER_REF } from '@/app/utils/constants';
import { FinanceWalletType } from '../../dashboard/types/wallets.types';

type TopUpProps = {
  setWatchTopUp: (value: boolean) => void;
  watchTopUp: boolean;
  walletCode: string | undefined
}

export default function TopUp({ setWatchTopUp, watchTopUp, walletCode }: TopUpProps) {

  const { topUpMutation } = useTopUp(setWatchTopUp, watchTopUp)
  const { alert } = useAlert()

  const [topUpPayload, setTopUpPaylod] = useState<CreateInflowPayload>({
    points: "",
    narration: '',
    initiatorUserId: "",
    providerReference: PROVIDER_REF || "",
    financeWalletCode: ""
  });
  const [token, setToken] = useState("");


  const profileQuery = useGetQuery<ProfileResponse>(
    {
      url: "profile",
      queryKeys: [`profile-${token}`, token],
    },
    {
      enabled: !!token,
      queryKey: [`profile-${token}`, token],
      refetchOnWindowFocus: false,
    }
  );
  // const walletQuery = useGetQuery<FinanceWalletType>(
  //   {
  //     url: `financewallet/${walletID}`,
  //     queryKeys: [`single-finance-wallet-${walletID}`, walletID],
  //   },
  //   {
  //     enabled: !!token,
  //     queryKey: [`single-finance-wallet-${walletID}`, walletID],
  //     refetchOnWindowFocus: false,
  //   }
  // );



  React.useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.accessToken && session?.accessToken !== token) {
        setToken(session?.accessToken);
      }
    };

    checkSession();
  }, [token]);


  const handleTopUpChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setTopUpPaylod((prev) => ({
      ...prev,
      [id]: value,
      initiatorUserId: profileQuery.data?.id,
      financeWalletCode:walletCode
    }));
  };



  const validateTopUpPayload = () => {

    const { points, narration } = topUpPayload


    if (Number(points) < 999) {
      return { message: "Top up point must be 1000 and above", name: 'points', error: true }
    }
    if (!Number(points)) {
      return { message: "Points must be numbers", name: 'points', error: true }
    }
    if (narration.length < 5) {
      return { message: "Pleae ensure narration has minimum of 5 characters", name: 'narration', error: true }
    }
    return { message: "", name: "", error: false }

  }

  const handleTopUp = () => {
    if (validateTopUpPayload().error) {
      alert(validateTopUpPayload().message, 'error')
      return
    }
    topUpMutation.mutate(topUpPayload)
  }




  return (
    <div className="w-full lg:w-[400px] p-[10px] border-[2px] rounded-[8px]">
      <p className="text-[20px] text-primary-color font-satoshi">
        Top up Account
      </p>
      <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
        <input
          type="number"
          id='points'
          placeholder="Enter points"
          className="text-[14px] h-full w-full outline-none"
          value={topUpPayload.points}
          onChange={handleTopUpChange}
        />
      </div>
      <small className="text-red-400">{validateTopUpPayload().name == 'points' ? validateTopUpPayload().message : ''}</small>
      <div className="h-[120px] rounded-[8px] border-[1px] p-[10px] mt-3">
        <textarea
          id='narration'
          placeholder="Enter Narration"
          className="text-[14px] h-full w-full outline-none resize-none"
          value={topUpPayload.narration}
          onChange={handleTopUpChange}
        ></textarea>
      </div>
      <small className="text-red-400">{validateTopUpPayload().name == 'narration' ? validateTopUpPayload().message : ''}</small>

      <div className="flex justify-end mt-3">

        <Button
          text="Continue"
          bg={validateTopUpPayload().error ? "bg-disabled-btn" : "bg-app-purple"}
          classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
          onClick={handleTopUp}
          isLoading={topUpMutation.isPending}
        />
      </div>
    </div>
  )
}
