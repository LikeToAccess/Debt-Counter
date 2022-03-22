var starting_debt = 0;  // Starting value for the counter
var runtime = 300; // Number of seconds the counter should run for
var speed = 20; // How many times per second the counter should update
var start_time = Math.round((new Date()).getTime() / 1000);
var debt_per_second = 103778.38 // How much the national debt increases on average every second


var currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function title_case(string) {
      var sentence = string.toLowerCase().split(" ");
      for(var i = 0; i< sentence.length; i++){
         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
   document.write(sentence.join(" "));
   return sentence;
}

const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0,n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f (g (x));
const not = x => !x;
const chunk = n => xs =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

// numToWords :: (Number a, String a) => a -> String
let numToWords = n => {
  
  let a = [
    '', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  
  let b = [
    '', '', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];
  
  let g = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
    'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
  ];00
  
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  let makeGroup = ([ones,tens,huns]) => {
    return [
      num(huns) === 0 ? '' : a[huns] + ' hundred ',
      num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
      a[tens+ones] || a[ones]
    ].join('');
  };
  
  let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
  
  if (typeof n === 'number')
    return numToWords(String(n));
  else if (n === '0')
    return 'zero';
  else
    return comp (chunk(3)) (reverse) (arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(' ');
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function counter() {
	await sleep(1000);
	let debt = 0;
	for (let index = 0; Math.round((new Date()).getTime() / 1000) - start_time < runtime; index++) {
		var counter_value = debt / speed;
		// console.log(numToWords(round(counter_value,2).slice(-2)));
		document.getElementById("counter_id").innerHTML = currency.format(counter_value);
		if ((index) % (1000 / speed) == 0) {
			document.getElementById("counter_words_id").innerHTML = numToWords(Math.round(counter_value)) + " dollars and " + numToWords(currency.format(counter_value).slice(-2)) + " cents";
		}
		await sleep(1000 / speed);
		debt += debt_per_second;
	}
}

function popout() {
	window.open(
		"counter",
		'popUpWindow',
		'height=400,width=1000,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes'
	)
}

counter();