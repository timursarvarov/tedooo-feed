import {ReactNode, FC} from 'react';
import {useInView} from "react-intersection-observer";

export type TypeVirtualScrollChildProps = {
    height: number;
    children: ReactNode;
}
const VirtualScrollChild: FC<TypeVirtualScrollChildProps> =
    ({height, children}: TypeVirtualScrollChildProps) => {
        const [ref, inView] = useInView();
        const style = {
            height: `${height}px`,
            overflow: 'hidden'
        };
        return (
            <div style={style} ref={ref}>
                {inView ? children : null}
            </div>
        );
    }

export default VirtualScrollChild;
