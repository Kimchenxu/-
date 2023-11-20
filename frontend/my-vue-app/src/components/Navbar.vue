<template>
  <nav class="shell " :class="{ 'close':isShellClosed}">
          <header>
              <div class="image-text">
                  <span class="image">
                      <img src="./1.jpg" alt="">
                  </span>
                  <div class="text logo-text">
                      <span class="name">starkim</span>
                  </div>
              </div>
              <i class="iconfont icon-xiangyoujiantou toggle" @click="toggleShell"></i>
          </header>
          <div class="menu-bar">
              <div class="menu">
                  <li class="search-box" @click="openShell">
                      <i class="iconfont icon-sousuo icon"></i>
                      <input type="text" :placeholder="$t('message.3')">
                  </li>
                  <ul class="menu-links">
                      <li class="nav-link">
                          <a href="/home">
                              <i class="iconfont icon-shouye icon"></i>
                              <span class="text nac-text">{{ $t('message.4') }}</span>
                          </a>
                      </li>
  
                      <li class="nav-link">
                          <a href="../html/calendar.html">
                              <i class="iconfont icon-shoucangxiao icon"></i>
                              <span class="text nac-text">{{ $t('message.5') }}</span>
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="bottom-content">
                  <li @click="logout">
                      <a href="javascript:void(0)">
                          <i class="iconfont icon-zhuxiaoyuan icon"></i>
                          <span class="text nac-text">{{ $t('message.6') }}</span>
                      </a>
                  </li>
                  <li class="mode" @click="toggleMode">
                      <div class="sun-moon">
                          <i class="iconfont icon-rijian icon sun"></i>
                          <i class="iconfont icon-yejian icon moon"></i>
                      </div>
                      <span class="mode-text text">{{ $t('message.7') }}</span>
                      <div class="toggle-switch">
                          <span class="switch"></span>
                      </div>
                  </li>
              </div>
          </div>
      </nav>
</template>


<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
name: 'Navbar',
setup() {
    const store = useStore();
    const isShellClosed = ref(true);
    const isDarkMode = ref(false);

    const toggleShell = () => {
        isShellClosed.value = !isShellClosed.value;
    };

    const openShell = () => {
        isShellClosed.value = false;
    };

    const toggleMode = () => {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    const logout = () => {
        store.dispatch('outLoggedIn').then(() => {
            this.$router.push({ name: 'login' });
        });
    };

    return {
        isShellClosed,
        toggleShell,
        openShell,
        toggleMode,
        modeText: computed(() => isDarkMode.value ? '白日模式' : '夜间模式'),
        logout
    };
}
};
</script>


<style>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



body {
  min-height: 100vh;
  background-color: var(--body-color);
  transition: all 0.3s ease;
}

/* 设置全局变量 */
:root {
  --body-color: #E4E9F7;
  --shell-color: #FFF;
  --primary-color: #695CFE;
  --primary-color-light: #F6F5FF;
  --toggle-color: #DDD;
  --text-color: #707070;
}
/* 深色主题变量 */
.dark {
  --body-color: #202224;
  --shell-color: #171717;
  --primary-color: #3a3b3c;
  --primary-color-light: #3a3b3c;
  --toggle-color:#fff;
  --text-color:#ccc;
}
.shell {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background: var(--shell-color);
  transition: all 0.3s ease;
  z-index: 100;
}

.close {
  width: 88px;
}

.shell li {
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.image,
.icon {
  min-width: 60px;
  border-radius: 6px;
}

.icon {
  min-width: 60px;
  border-radius: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 300 23px '';
}

.text,
.icon {
  color: var(--text-color);
  transition: all 0.3s ease;
}

.text {
  font: 500 17px;
  white-space: nowrap;
  opacity: 1;
}

.shell.close .text {
  opacity: 0;
}

header {
  position: relative;
}

.image-text {
  display: flex;
  align-items: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.name {
  margin-top: 2px;
  font: 600 18px '';
}

.software {
  font-size: 20px;
  margin-top: -2px;
  display: block;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image img {
  width: 45px;
  border-radius: 6px;
}

.toggle {
  position: absolute;
  top: 50%;
  right: -25px;
  transform: translateY(-50%) rotate(180deg);
  height: 25px;
  width: 25px;
  background-color: var(--primary-color);
  color: var(--shell-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle {
  color: #ccc;
}

.shell.close .toggle {
  transform: translateY(-50%) rotate(0deg);
}

.menu {
  margin-top: 40px;
}

li.search-box {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

li.search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: var(--primary-color-light);
  color: var(--text-color);
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.shell li a {
  list-style: none;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.shell li a:hover {
  background-color: var(--primary-color);
}

.shell li a:hover .icon,
.shell li a:hover .text {
  color: var(--shell-color);
}

.menu-bar {
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}

.menu-bar::-webkit-scrollbar {
  display: none;
}

.menu-bar .mode {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  position: relative;
  transition: all 0.3s ease;
}

.menu-bar .mode .sun-moon {
  height: 50px;
  width: 60px;
}

.mode .sun-moon i {
  position: absolute;
}

.mode .sun-moon i.sun {
  opacity: 0;
}

.toggle-switch {
  position: absolute;
  right: 0;
  height: 100%;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}

.menu-bar .mode {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  position: relative;
  transition: all 0.3s ease;
}

.menu-bar .mode .sun-moon {
  height: 50px;
  width: 60px;
}

.mode .sun-moon i {
  position: absolute;
}

.mode .sun-moon i.sun {
  opacity: 0;
}

.toggle-switch {
  position: absolute;
  right: 0;
  height: 100%;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}

.switch {
  position: relative;
  height: 22px;
  width: 40px;
  border-radius: 25px;
  background-color: var(--toggle-color);
  transition: all 0.3s ease;
}

.switch::before {
  content: '';
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  background-color: var(--shell-color);
  transition: all 0.3s ease;
}

.dark .shell li a:hover .icon,
.dark .shell li a:hover .text {
  color: #ccc;
}

.dark .mode .sun-moon i.sun {
  opacity: 1;
}

.dark .mode .sun-moon i.moon {
  opacity: 0;
}

.dark .switch::before {
  left:20px;
}

</style>
