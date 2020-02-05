import axios from 'axios'
import apiUrl from '../../apiConfig'

    

    export const index = (admin) => {
        return axios({url:apiUrl + "/users",
        method: "get",
        headers:{
            "Authorization":`Bearer ${admin.token}`
        }
        })
        }
    //     export const update = (admin,id,isApproved) => {
    //         return axios({url:apiUrl + "/users/" + id,
    //                 method: "patch",
    //                 data:{isApproved:isApproved},
    //                 headers:{
    //                     "Authorization":`Bearer ${admin.token}`
    //                 }
    //                 })
    //     }  
    //     export const destroy = (admin,id) => {
    //         return axios({
    //         url:apiUrl + "/users/" +id,
    //         method: "delete",
    //         headers:{
    //             "Authorization":`Bearer ${admin.token}`
    //         }
    //         })
    // }