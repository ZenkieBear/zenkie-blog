import styles from './SassDemo.module.scss';
import clsx from 'clsx';

const SassDemo = () => {
  console.log(styles)
  return (
    <div className={styles['sass-demo']}>
      <h1 className={styles.title}>Color Panel</h1>
      <div style={{
        color: styles.primaryColor
      }}>Primary Color</div>
      <div className={styles.info}>Info</div>
      <div className={styles.alert}>Alert info</div>
      <div className={styles.success}>Success info</div>

      <div className={clsx([
        styles['message-box'],
        styles.message
      ])}>Message</div>
      <div className={clsx([
        styles['message-box'],
        styles.success
      ])}>Success message</div>
      <div className={clsx([
        styles['message-box'],
        styles.error
      ])}>Error message</div>
      <div className={clsx([
        styles['message-box'],
        styles.warning
      ])}>Warning message</div>
    </div>
  )
}

export default SassDemo