export default async function ({ $axios, store, redirect }) {
    console.log($axios)
    // ユーザーが認証されていないとき
    if (!store.state.user) {
        try {
            const { data } = await $axios("./api/user")
            await store.dispatch('login', { username : data.username })
        } catch (error) {

        }

    }

  }