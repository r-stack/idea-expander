<template>
  <section id="count" class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h3 class="title has-text-grey">スコアランキング</h3>
        <div class="column is-4 is-offset-4">
          <table class="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
              <tr v-for="(user, index) in rankedUsers" :key="index">
                <td>{{index + 1}}</td>
                <td>{{user.name}}</td>
                <td>{{user.score}}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import _ from 'underscore';
import { auth, db } from '@/firebase';

export default {
  name: 'Result',
  data() {
    return {
      users: [],
    };
  },
  created() {
    console.log('result: created');
    this.createdPromise = new Promise(async (resolve, reject) => {
      console.log('result: bind userRef');
      this.userRef = db.ref(`users/${auth.currentUser.uid}`);
      await this.$rtdbBind('user', this.userRef);
      console.log('user:', this.user);
      console.log('result: bind cardsRef');
      this.usersRef = db.ref('users').orderByChild('room').equalTo(this.user.room);
      await this.$rtdbBind('users', this.usersRef);
      console.log('users:', this.users);
      resolve();
    });
  },
  mounted() {
    this.createdPromise
      .then(() => {
        console.log('ok');
      })
      .catch((e) => {
        console.error(e);
      });
  },
  computed: {
    // スコア降順でソートしたユーザリスト
    rankedUsers() {
      return this.users.sort((a, b) => {
        return b.score - a.score
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>

