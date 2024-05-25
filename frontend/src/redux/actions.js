export async function getUserInfo(token) {
    try {
      let userInfo = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      let data = await userInfo.json()
      if (data.status === 200) {
        return data.body
      } else {
        console.error("Error getting user info")
        return null
      }
      
    } catch (error) {
      console.error(error, "Error getting user info");
    }
  }

  export async function loginHandleSubmit(e) {
    console.log(e.target.password.value, "e")
    e.preventDefault();
    try {
        let response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify({ "email": e.target.email.value, "password": e.target.password.value }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        if (response.status === 200) {
            let token = data.body.token
            return token
        } else if (response.status !== 500) {
            return 400
        } else {
           return 500
        }
    } catch (error) {
        console.error(error, "Error logging in");
    }
    console.log("Submit")
}

export async function signUpHandler(e) {
    e.preventDefault();
    try {
        let response = await fetch('http://localhost:3001/api/v1/user/signup', {
            method: 'POST',
            body: JSON.stringify({ 
                "email": e.target[0].value, 
                "password": e.target[1].value, 
                "firstName": e.target[2].value, 
                "lastName": e.target[3].value, 
                "userName": e.target[4].value }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(response, "response")
        if (response.status === 200) {
            return "Compte créé avec succès !"
        } else {
            return "Erreur lors de la création du compte" 
        }
    } catch (error) {
        console.error(error, "Error signing up");
    }
    console.log("Submit")
}

export async function handleSubmit(e, token) {
    e.preventDefault();
    let userName = e.target.username.value
    try {
        let fetching = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            body: JSON.stringify({ "userName": userName }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let response = await fetching.json()
        return response.body
    } catch (error) {
        console.error(error, "Error modifying username");
        return 500
    }
}