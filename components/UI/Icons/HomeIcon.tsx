import { SVGProps } from 'react';

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		fillRule='evenodd'
		clipRule='evenodd'
		viewBox="0 0 24 24"
		{ ...props }
	>
		<path
			d="M12.6344 1.5L24 11.8407L22.7312 13.1066L20.9263 11.4735V23.1086L20.0328 24H14.6716L13.7781 23.1086V16.8685H10.204V23.1086L9.3105 24H3.94937L3.05585 23.1086V11.4877L1.2688 13.1066L0 11.8407L11.3477 1.5H12.6344ZM4.84289 9.86708V22.2171H8.41698V15.977L9.3105 15.0856H14.6716L15.5652 15.977V22.2171H19.1392V9.85638L11.9911 3.38986L4.84289 9.86708Z"
			fill='currentColor'
		/>
	</svg>
);

export default HomeIcon;
