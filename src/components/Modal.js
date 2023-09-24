import styles from "../custom.module.css";
export default function Modal(props) {
  return (
<div >
       <div className={styles.backdrop}>
       <section className={styles.modal}>
        <header>
          <svg
            onToggle={props.toggleModel}
            class="fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <h3>{props.header}</h3>
        </header>

        <main>{props.children}</main>

        <footer>
          <button onClick={props.toggleModel} type="">
            {" "}
            {props.ConfirmText}
          </button>
          <button onClick={props.toggleModel} type="">
            {props.CancelText}
          </button>
        </footer>
      </section>
      </div>
     
      
      </div>
  );
}
