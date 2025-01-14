import { ActionContext, ActionTree } from 'vuex'
// eslint-disable-next-line import/no-cycle
import axios from '@/plugins/axios'

// eslint-disable-next-line import/no-cycle
import { RootState, store } from '@/store'

import { LoginCredentials, RegisterCredentials } from '@/types'
import { State } from './state'
import { Mutations } from './mutations'
import { AuthMutationTypes } from './mutation-types'
import { AuthActionTypes } from './action-types'
import { CartActionTypes } from '../cart/action-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [AuthActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    { email, password }: LoginCredentials
  ): Promise<void>
  [AuthActionTypes.REGISTER](
    { commit }: AugmentedActionContext,
    { name, email, password, passwordConfirmation }: RegisterCredentials
  ): Promise<void>
  [AuthActionTypes.LOGOUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [AuthActionTypes.LOGIN]({ commit }, { email, password }) {
    return axios
      .post('/login', {
        email,
        password,
      })
      .then(({ data }) => {
        commit(AuthMutationTypes.SET_USER_DATA, {
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            createdAt: data.user.created_at,
            updatedAt: data.user.updated_at,
          },
          accessToken: data.access_token,
        })
      })
      .then(() => {
        store.dispatch(CartActionTypes.GET_CART)
      })
  },
  [AuthActionTypes.REGISTER](
    { commit },
    { name, email, password, passwordConfirmation }
  ) {
    return axios
      .post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        commit(AuthMutationTypes.SET_USER_DATA, {
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            createdAt: data.user.created_at,
            updatedAt: data.user.updated_at,
          },
          accessToken: data.access_token,
        })
      })
  },
  [AuthActionTypes.LOGOUT]({ commit }) {
    commit(AuthMutationTypes.CLEAR_USER_DATA)
  },
}
