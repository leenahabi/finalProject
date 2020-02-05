import apiUrl from '../../apiConfig';
import axios from 'axios'


export const index = (user) => {
return axios({
    method: "get",
    url:apiUrl + `/students`,

headers:{
    "Authorization":`Bearer ${user.token}`
}
})
}

export const show = (user,studentid) => {
    return axios({url:apiUrl + `/students/` +studentid,
    method: "get",
    headers:{
        "Authorization":`Bearer ${user.token}`
    }
    })
    }
    export const showBuses = (admin) => {
        return axios({
        url:apiUrl + "/student/buses/",
        method: "get",
        headers:{
            "Authorization":`Bearer ${admin.token}`
        }
        })
        }

export const create = (user,data) => {
        console.log(data)
        return axios({url:apiUrl + `/students`,
        method: "post",
        data:{data},
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
        })
        }
        // export const update = (guardianid,studentid) => {

    // return axios({url:apiUrl + `/cars/${guardianid}/students` + studentid,
    //         method: "put",
    //         data:{car:car}
    //         })
    //         }        
        

export const destroy = (user,studentid) => {
        return axios({url:apiUrl +`/students/` + studentid,
        method: "delete",
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
        })
        }