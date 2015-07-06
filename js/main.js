(function(navClass, tooltipClass)
{
	var nav = document.querySelector('.' + navClass)
	,navActiveClass = navClass + '--active'
	,tooltipActiveClass = tooltipClass + '--active'
	,currentTooltip
	,handleFocus = function(e)
	{
		var focused = e.type === 'focus' ? document.activeElement : e.target;

		if(focused === window || focused === document)
			focused = document.body;

		if(nav.contains(focused))
			nav.classList.add(navActiveClass);
		else
			nav.classList.remove(navActiveClass);

		if(focused.classList.contains(tooltipClass))
		{
			currentTooltip = focused;
			focused.classList.add(tooltipActiveClass);
		}

		if(currentTooltip && currentTooltip !== focused && !currentTooltip.contains(focused))
		{
			currentTooltip.classList.remove(tooltipActiveClass);
			currentTooltip = null;
		}
	};

	//TODO: find a SANE way to do this…
	window.addEventListener('focus', handleFocus, true);
	window.addEventListener('blur', handleFocus, true);
	window.addEventListener('click', handleFocus, true);

	window.addEventListener('keydown', function(e)
	{
		var target = e.target;
		
		if(target && ['input', 'textarea'].indexOf(target.tagName.toLowerCase()) !== -1)
			return;

		if(e.keyCode == 27)
			location.hash = '#menu';

	}, false);

	nav.addEventListener('click', function(e)
	{
		var target = e.target;

		if(!target || target.tagName.toLowerCase() !== 'a')
			return;

		var elem = document.getElementById(target.getAttribute('href').substring(1));

		elem.addEventListener('transitionend', function f(e)
		{
			this.focus();

			this.removeEventListener('transitionend', f, false);
		}, false)
	});
}('hexagonContainer--3d', 'tooltip'));
