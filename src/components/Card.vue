<template>
  <div class="idea-card card">
    <div class="card-content" @click="play(card)">
      <p class="title">{{ card.name }}</p>
      <p class="subtitle">{{ isPlayed ? 'プレイ済み' : '' }}</p>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';

export default {
  name: 'Card',
  props: {
    pkey: {
      type: String
    },
    card: {
      type: Object
    },
    cardsRef: {
      type: Object
    },
    uid: {
      type: String
    }
  },
  data() {
    const isPlayed = this.card.players[this.uid] ? true : false;
    return {
      isPlayed
    }
  },
  methods: {
    // ほかの人が作ったカードをプレイ
    play(card) {
      console.log('uid', this.uid);
      console.log('card', this.card);
      console.log('key', this.pkey);
      console.log('cardsRef', this.cardsRef);
      const cardRef = this.cardsRef.child(this.pkey);
      // 自分をプレイ済みにする
      cardRef.child(`players/${this.uid}`).set(true);
      // 参照数を上げる
      cardRef.child(`mentionCount`).transaction(mentionCount => {
        return mentionCount + 1;
      })
      .catch(e => {
        console.error(e);
      });
      this.isPlayed = true;
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


