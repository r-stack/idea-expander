<template>
  <section id="playroom" class="columns is-multiline">
    <nav class="navbar is-fixed-top">
      <div class="navbar-start">
        <div class="navbar-item">
          <span class="title">テーマ: {{ user ? user.room : '' }}</span>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <span class="title">カード総数: {{ cards ? Object.keys(cards).length : '' }}</span>
        </div>
        <div class="navbar-item">
          <img src="./../assets/card_create3_25.png"
          v-if="user.badges.createBadge >= 10 & user.badges.createBadge < 20" />
          <img src="./../assets/card_create2_25.png"
          v-else-if="user.badges.createBadge >= 20 & user.badges.createBadge < 30" />
          <img src="./../assets/card_create1_25.png"
          v-else-if="user.badges.createBadge >= 30" />
        </div>
        <div class="navbar-item">
          <img src="./../assets/combo3_25.png"
          v-if="user.badges.mentionBadge >= 10 & user.badges.mentionBadge < 20" />
          <img src="./../assets/combo2_25.png"
          v-else-if="user.badges.mentionBadge >= 20 & user.badges.mentionBadge < 30" />
          <img src="./../assets/combo1_25.png"
          v-else-if="user.badges.mentionBadge >= 30" />
        </div>
        <div class="navbar-item">
          <img src="./../assets/favorite3_25.png"
          v-if="user.badges.favBadge >= 10 & user.badges.favBadge < 20" />
          <img src="./../assets/favorite2_25.png"
          v-else-if="user.badges.favBadge >= 20 & user.badges.favBadge < 30" />
          <img src="./../assets/favorite1_25.png"
          v-else-if="user.badges.favBadge >= 30" />
        </div>
      </div>
    </nav>
    <div class="columns is-multiline is-mobile">
      <Card
        v-for="(card, key) in cards"
        :key="key"
        :pkey="key"
        :card="card"
        :cardsRef="cardsRef"
        :uid="user['.key']"
      />
    </div>
    <nav class="navbar is-fixed-bottom">
      <input class="input is-large is-fullwidth" type="text" placeholder="Create new idea card" autofocus=""
              v-model="newCardname" v-on:keyup.enter="createCard(newCardname)" />
      <button class="button is-block is-info is-large"
              @click="createCard(newCardname)">
              作成
      </button>
      <button class="button is-block is-info is-large"
              @click="record()">
              音声
      </button>
      <button class="button is-block is-info is-large"
              @click="result()">
              終了
      </button>
    </nav>
  </section>
</template>

<script>
import {db, auth} from '@/firebase';
import Card from './Card'

const recognition = new webkitSpeechRecognition();

export default {
  name: 'PlayRoom',
  components: {
    Card
  },
  data() {
    console.log(auth, db);
    return {
      cards: undefined,
      newCardname: ''
    };
  },
  created() {
    console.log('playroom: created');
    this.createdPromise = new Promise(async (resolve, reject) => {
      console.log('playroom: bind userRef');
      this.userRef = db.ref(`users/${auth.currentUser.uid}`);
      await this.$rtdbBind('user', this.userRef);
      console.log('user:', this.user);
      console.log('playroom: bind cardsRef');
      this.cardsRef = db.ref(`cards/${this.user.room}`);
      await this.$rtdbBind('cards', this.cardsRef);
      console.log('cards:', this.cards);
      resolve();
    });
  },
  mounted() {
    this.createdPromise
      .then(() => {
        console.log('playroom: mounted');
      })
      .catch((e) => {
        console.error(e);
      });
  },
  methods: {
    createCard(newCardname) {
      this.cardsRef.push({
        creator: this.user['.key'],
        name: newCardname,
        mentionCount: 0,
        favCount: 0,
        players: {
          [this.user['.key']]: true
        }
      })
      .then(() => {
        this.newCardname = '';
        console.log('cards', this.cards);
      })
      .catch(e => {
        console.error(e);
      });
      // スコア更新
      this.userRef.child('score').transaction(score => {
        return score + 10;
      })
      // カード作成バッジスコア加算
      this.userRef.child('badges/createBadge').transaction(createBadge => {
        return createBadge + 1;
      })
    },
    record() {
      recognition.onresult = event => {
        if (event.results.length > 0) {
          this.newCardname = event.results[0][0].transcript;
        };
      };
      recognition.start();
    },
    result() {
      this.$router.push({
        name: 'Result'
      });
    }
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
  width: 128px;
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


