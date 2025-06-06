/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import { Star, ChevronDown } from 'lucide-react';

interface AccordionProps {
	user: any;
	repos: any[];
	onToggle: (username: string) => void;
	isOpen: boolean;
	loading: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
	user,
	repos,
	onToggle,
	isOpen,
	loading,
}) => {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			// Delay the calculation to ensure content is fully rendered
			setTimeout(() => {
				const contentHeight = isOpen
					? `${contentRef.current!.scrollHeight + 20}px`
					: '0px';
				contentRef.current!.style.maxHeight = contentHeight;
			}, 0);
		}
	}, [isOpen, repos]);

	return (
		<div className="box-border">
			<button
				type="button"
				className="cursor-pointer p-4 hover:bg-gray-100 bg-gray-200 rounded w-full text-left flex justify-between"
				onClick={() => onToggle(user.login)}
			>
				{user.login}
				<ChevronDown
					className={`${isOpen ? 'rotate-180' : ''} transition-all`}
				/>
			</button>
			<div
				ref={contentRef}
				className="border-l border-gray-200 overflow-hidden transition-max-height duration-400 ease-in-out"
				style={{
					maxHeight: '0px',
					padding: isOpen ? '0px 0px 16px 16px' : '0px',
					margin: isOpen ? '16px 0px 0px 0px' : '0px',
				}}
			>
				{loading ? (
					<div className="animate-pulse">
						<div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
						<div className="h-4 bg-gray-300 rounded w-1/2"></div>
					</div>
				) : repos.length === 0 && isOpen ? (
					<div className="text-gray-700">No repositories to display.</div>
				) : (
					<ul className="flex flex-col gap-2">
						{repos.map(repo => (
							<li
								key={repo.id}
								className="bg-gray-300 p-2 rounded flex justify-between min-h-[80px]"
							>
								<div className="box-border">
									<div className="font-bold">{repo.name}</div>
									<div className="text-sm text-gray-700">
										{repo.description || 'No description available.'}
									</div>
								</div>
								<div className="flex items-start text-sm gap-1 font-bold">
									<div className="flex gap-1 items-center">
										{repo.stargazers_count || 0}
										<Star />
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Accordion;
