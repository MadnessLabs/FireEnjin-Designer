export default async function (url) {
    return new Promise((resolve, reject) => {
        // Adding the script tag to the head as suggested before
        try {
            var head = document.head;
            var script: any = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
    
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = () => {
                resolve(script);
            };
            script.onload = () => {
                resolve(script);
            };
    
            // Fire the loading
            head.appendChild(script);
        } catch (error) {
            reject(error);
        }
    });
    
};