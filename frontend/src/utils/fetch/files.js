export async function delete_file(id){
    //const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`files/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${accessToken}`,
        },
    })
    return {ok: res.ok}
}

export async function get_group_files(user_id){
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT + `user/${user_id}/files`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${accessToken}`,
        },
    });
    if (res.ok) {
        const data = await res.json();
        return {ok: true, files: data};
    } else {
        return {ok: false, files: []};
    }
}
