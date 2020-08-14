import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"

import { getStaked } from '../hamUtils'
import useHam from './useHam'

const useStakedBalance = (pool: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const yam = useHam()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(yam, pool, account)
    setBalance(new BigNumber(balance))
  }, [account, pool, yam])

  useEffect(() => {
    if (account && pool && yam) {
      fetchBalance()
    }
  }, [account, pool, setBalance, yam])

  return balance
}

export default useStakedBalance