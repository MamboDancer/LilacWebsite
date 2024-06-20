const { createApp } = Vue
  createApp({
    data() {
      return {
        servers: [],
        id: 0,
        name: '',
        descr: '',
        quanity: 0,
        price: 0,
        eid: 0,
        ename: '',
        edescr: '',
        equanity: 0,
        eprice: 0,
        polling: null
      }
    },
    methods : {
        

    closeForm()
    {
      $(".edit-form form").css("display", "none")
    },
    async updateRow(el)
    {
      const data = {
          eid: this.eid,
          ename: this.ename,
          edescr: this.edescr,
          equanity: this.equanity,
          eprice: this.eprice
        }
        const res = await fetch('/api/db/update', {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        this.ename = ''
        this.edescr = ''
        this.eprice = 0
        this.equanity = 0
        const ress = await fetch("/api/db")
        this.servers = await ress.json()
      $(".edit-form form").css("display", "none")
    },
    async changeRow(rowid)
    {
      this.id = rowid
      this.eid = rowid
      const data = {
        id: this.id
      }
      const res = await fetch('api/db/', 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      await res.json().then((result) => {
        $(".edit-form form").css("display", "flex")
        $(".edit-form form #name-input").val(result[0]['name'])
        this.ename = $(".edit-form form #name-input").val()
        $(".edit-form form #descr-input").val(result[0]['descr'])
        this.edescr = $(".edit-form form #descr-input").val()
        $(".edit-form form #quanity-input").val(result[0]['quanity'])
        this.equanity = $(".edit-form form #quanity-input").val()
        $(".edit-form form #price-input").val(result[0]['price'])
        this.eprice = $(".edit-form form #price-input").val()
        $(".edit-form form").css("display", "flex")
      })
    },
      async createServer()
      {
        const data = {
          id: this.id,
          name: this.name,
          descr: this.descr,
          quanity: this.quanity,
          price: this.price
        }
        const res = await fetch('/api/db/add', {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        this.name = ''
        this.descr = ''
        this.quanity = ''
        this.price = ''
        const ress = await fetch("/api/db")
        this.servers = await ress.json()
      },
      async refresh()
      {
        const ress = await fetch("/api/db")
        this.servers = await ress.json()
      },
      async deleteRow()
      {
        const data = {
          id: this.eid,
        }
        const res = await fetch("api/db/deleteRow", {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        $(".edit-form form").css("display", "none")
        const ress = await fetch("/api/db")
        this.servers = await ress.json()
      }
    },
    async mounted()
    {
        const ress = await fetch("/api/db")
        this.servers = await ress.json()
    }
  }).mount('#app')


createApp({
  data() {
      return {
        servers: [],
        user: '',
        pass: '',
        responce: []
      }
    },
  methods :
  {
    async loginUser()
    {
       const data = {
          user: this.user,
          pass: this.pass,
        }
      const res = await fetch("api/db/fetchuser", {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const responce = await res.json()
        const role = responce[0]['role']

        
        if(role=== 'commonuser')
        {
          await fetch("/login",{
            method: 'POST',
            headers:
          {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({ state: true, user: this.user, admin: false })
          })
          location.reload()
        }
        else if(role === 'admin')
        {
          await fetch("/login",{
            method: 'POST',
            headers:
          {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({ state: true, user: this.user, admin:true })
          })
          
          location.reload()
        }
        else
        {
          alert("Wrong Credentials")
        }
        
    }
  }
}).mount('#login-panel')



createApp({
   data() {
      return {
        servers: [],
        user: '',
        pass: ''
      }
    },
    methods :
    {
      async regUser()
    {
       const data = {
          user: this.user,
          pass: this.pass,
        }
       const res = await fetch("api/db/reguser", {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
    }
    }
      
  }).mount('#reg-panel')