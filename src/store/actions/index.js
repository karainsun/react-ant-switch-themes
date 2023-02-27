import { UserInfo } from 'store/state'

// export const setCollapsed = (collapsed: any): object => {
//   return (dispatch: (arg: { type: string; collapsed: any }) => void) => {
//     (() => {
//       dispatch({
//         type: 'SET_COLLAPSED',
//         collapsed
//       });
//     })();
//   };
// };
export const setCollapsed = (collapsed) =>({
  type: 'SET_COLLAPSED',
  collapsed
})

export const setUserInfo = (info) => ({
  type: 'USER_INFO',
  userInfo: info
})
