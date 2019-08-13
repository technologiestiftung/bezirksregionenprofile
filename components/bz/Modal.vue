<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>
<template>
  <transition name="modal-fade">

    <div class="modal-backdrop" @click="close">

      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
        <div id="legend_s1">
          <h3>Wie die Grafiken zu lesen sind</h3>
          <p>
            Für jeden Kernindikator wird der Wert des Bezirks (der Bezirksregion) mit 
            Berlin (bzw. für Bezirksregionen wahlweise mit Berlin oder dem Bezirk) verglichen. 
            Die Abweichung vom Vergleichswert wird in Prozent angezeigt.
          </p>
        </div>

        <div align="center">
            <img src="img/vgl-berlin.png">  
        </div>
        <div id="legend_s2">
          <h3>Kurzinfo zu den Kernindikatoren</h3>
          <p>
             Ein Hover über das "i" bei jedem Kernindikator zeigt eine ausführlichere Erklärung des Indikators sowie den genauen Wert an.
          </p>
        </div>
        <div align="center">
          <img src="img/info-i.png">  
        </div>

        <div id="legend_s2">
          <h3>Ausfürliche Info zu den Kernindikatoren</h3>
          <a class="link" href="/about">Hier klicken</a>
        </div>
        <!-- <img src="img/graf-info.png"> -->

        <div class="modal-footer">
        </div>


        </section>
      </div>
    </div>
  </transition>
  
</template>

<style scoped>
  #legend_s1{
    float: none;
  }

  #legend_s1{
    position: none;
  }

  #legend_s1 p {
    float: left;
    width: 70%; 
  }

  #legend_s1 h3 {
    width: 70%; 
  }

  #legend_s2 p {
    float: left;
    width: 70%; 
  }

  #legend_s2 h3 {
    float: none;
    margin-top: 4em;
    width: 70%; 
  }

  .link{
    font-size: 0.8em;
    margin-bottom: 10em;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    width: 70%;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: flex-end;  
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .modal-body {
    position: relative;
    padding: 20px;
    padding-left: 40px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 1px;
    padding-right: 28px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
    text-align: right;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  img {
    width: 14vw;
    margin-top: -1em;
    margin-left: 2em;
    float: left; 

  }
</style>
