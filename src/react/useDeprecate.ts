import {useEffect} from 'react'

export const useDeprecate = (
  cond: boolean,
  subject: string,
  useInstead?: string,
) => {
  useEffect(() => {
    if (cond) {
      console.error(
        `${subject} is deprecated${
          useInstead ? `, prefer ${useInstead} instead` : ''
        }`,
      )
    }
  }, [cond, subject, useInstead])
}
