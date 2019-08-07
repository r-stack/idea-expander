<template>
  <section id="count" class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <!-- <h3 class="title has-text-grey">スコアランキング</h3> -->
        <div class="title loading">
            <span>ス</span>
            <span>コ</span>
            <span>ア</span>
            <span>ラ</span>
            <span>ン</span>
            <span>キ</span>
            <span>ン</span>
            <span>グ</span>
        </div>
        <div class="column is-4 is-offset-4">
          <div class="table-container">
            <table class="table is-striped is-hoverable is-fullwidth">
              <thead style="background-color: #42afe3;">
                <tr>
                  <th style="text-align:center">Rank</th>
                  <th style="text-align:center">Name</th>
                  <th style="text-align:center">Score</th>
                  <th style="text-align:center">Badge</th>
                </tr>
              </thead>
              <tbody>              
                <tr v-for="(user, index) in rankedUsers" :key="index">
                  <td class="rank-elem">{{index + 1}}</td>
                  <td class="name-elem">{{user.name}}</td>
                  <td class="score-elem">{{user.score}}</td>
                  <td class="badge-elem">
                    <img src="./../assets/card_create3_25.png"
                    v-if="user.badges.createBadge >= 10 & user.badges.createBadge < 20" />
                    <img src="./../assets/card_create2_25.png"
                    v-else-if="user.badges.createBadge >= 20 & user.badges.createBadge < 30" />
                    <img src="./../assets/card_create1_25.png"
                    v-else-if="user.badges.createBadge >= 30" />

                    <img src="./../assets/combo3_25.png"
                    v-if="user.badges.mentionBadge >= 10 & user.badges.mentionBadge < 20" />
                    <img src="./../assets/combo2_25.png"
                    v-else-if="user.badges.mentionBadge >= 20 & user.badges.mentionBadge < 30" />
                    <img src="./../assets/combo1_25.png"
                    v-else-if="user.badges.mentionBadge >= 30" />

                    <img src="./../assets/favorite3_25.png"
                    v-if="user.badges.favBadge >= 10 & user.badges.favBadge < 20" />
                    <img src="./../assets/favorite2_25.png"
                    v-else-if="user.badges.favBadge >= 20 & user.badges.favBadge < 30" />
                    <img src="./../assets/favorite1_25.png"
                    v-else-if="user.badges.favBadge >= 30" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div><!-- hero body -->
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
.badge-elem {
  white-space: nowrap;
}
html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
  background-color: #1D6A96;
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
.rank-elem{
    text-align:center;
}
.name-elem{
    text-align:center;
}
.score-elem{
    text-align:center;
}




.loading span {
  display: inline-block;
  margin: 0 -.05em;
  animation: loading .8s infinite;
  color: #283B42
}
.loading span:nth-child(2) {
  animation-delay: .1s;
}
.loading span:nth-child(3) {
  animation-delay: .2s;
}
.loading span:nth-child(4) {
  animation-delay: .3s;
}
.loading span:nth-child(5) {
  animation-delay: .4s;
}
.loading span:nth-child(6) {
  animation-delay: .5s;
}
.loading span:nth-child(7) {
  animation-delay: .6s;
}
.loading span:nth-child(8) {
  animation-delay: .7s;
}
@keyframes loading {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
}

</style>

