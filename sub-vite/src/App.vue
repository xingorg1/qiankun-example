<template>
  <div id="app">
    <h1>vite项目</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>
