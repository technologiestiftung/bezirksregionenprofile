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
<!--         <header
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
 -->
        <section
          class="modal-body"
          id="modalDescription"
        >
        <div>
          <p>
            Für jeden Kernindikator wird der Wert des Bezirks (der Bezirksregion) mit 
            Berlin (bzw. für Bezirksregionen wahlweise mit Berlin oder dem Bezirk) verglichen. 
            Die Abweichung vom Vergleichswert wird in Prozent angezeigt.
          </p>
        </div>
        <div align="center">
            <img src="img/vgl-berlin.png">  
        </div>
        <div>
          <p>
             Ein Hover über das "i" bei jedem Kernindikator zeigt eine ausführlichere Erklärung des Indikators sowie den genauen Wert an.
          </p>
        </div>
        <div align="center">
          <img src="img/info-i.png">  
        </div>
        <!-- <img src="img/graf-info.png"> -->

        </section>

      </div>
    </div>
  </transition>
  
</template>

<style>
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
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  img{
    width: 12vw;
  }
</style>
