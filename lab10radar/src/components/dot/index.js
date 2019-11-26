import style from './style.css';

const Dot = ({ x, y, username }) => (
	<div class={style.dotFather} style={{ left: `${x}px`, top: `${y}px` }}>
		<div class={style.dot} />
		<div class={style.user} style={{ left: `0px`, top: `5px` }}>{username}</div>
	</div>
);

export default Dot;