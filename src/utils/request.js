
export const graphqlRequest = async ( payload,options={})=>{
    if(localStorage.getItem('accessToken')){
        const res = await fetch(`${import.meta.env.VITE_GRAPH_URL}/graphql`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              ...options
            },
            body: JSON.stringify(payload),
          });

          if(!res.ok){
              if(res.status === 403){
                  window.location.replace('/login')
                  return null
              }
          }

          
          

          const data = await res.json()
          return data;
    }
    
    return null;
}