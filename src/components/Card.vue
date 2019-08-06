<template>
  <div class="idea-card card">
    <div class="card-content" @click="play(card)">
      <p class="title">{{ card.name }}</p>
    </div>
  </div>
</template>

<script>
import { auth, db } from './../firebase';

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
  methods: {
    play(card) {
      console.log('uid', this.uid);
      console.log('card', this.card);
      console.log('key', this.pkey);
      console.log('cardsRef', this.cardsRef);
      console.log('cardRef', this.cardsRef.child(this.pkey));
      this.cardsRef.child(`${this.pkey}/players/${this.uid}`).set(true);
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


