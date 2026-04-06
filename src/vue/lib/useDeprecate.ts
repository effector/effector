import {onMounted} from 'vue-next'

export function useDeprecate(
  cond: boolean,
  subject: string,
  useInstead?: string,
) {
  onMounted(() => {
    if (cond) {
      console.error(
        `${subject} is deprecated${
          useInstead ? `, prefer ${useInstead} instead` : ''
        }`,
      )
    }
  })
}
