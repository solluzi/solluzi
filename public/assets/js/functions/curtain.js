/* Open when someone clicks on the span element */
function openRightToLeftNav(id, size)
{
    document.getElementById(id).style.width = size+"%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeRightToLeftNav(id)
{
    document.getElementById(id).style.width = "0%";
}

/* Open */
function openSlideDownNav(id, size)
{
    document.getElementById(id).style.height = size+"%";
}

/* Close */
function closeSlideDownNav(id)
{
    document.getElementById(id).style.height = "0%";
}

/* Open */
function openSlideUpNav(id, size)
{
    document.getElementById(id).style.height = size+"%";
}

/* Close */
function closeSlideUpNav(id)
{
    document.getElementById(id).style.height = "0%";
}