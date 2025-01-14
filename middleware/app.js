export default function ({ store, redirect }) {
    let auth = store.getters['users/token']
    if (!auth) {
        return redirect('/login')
    }
}
