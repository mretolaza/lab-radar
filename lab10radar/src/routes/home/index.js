import style from './style.scss';
import Dot from '../../components/dot';

const Home = ({ posList, currPosition }) => (
	<div class={style.home}>
		<div class={style.radar}>
			<div class={style.sweep} />
		</div>
		<div class={style.points}>
			{posList.filter(e => e.name !== 'Mercedes Retolaza').map(pos => {
				const coords = { x: pos.latitude - currPosition.latitude + (window.innerWidth / 2), y: pos.longitude - currPosition.longitude + (window.innerHeight / 2) };
				return <Dot x={coords.x} y={coords.y} username={pos.name} />;
			})}
		</div>
	</div>
);

export default Home;
