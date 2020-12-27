
const AmbaHelpers = {
// Returns hours and minutes given the minutes
minSec: (minutes)=>{
    // time_str = ""
    if(minutes<60){
        return {min: minutes, hrs: 0}
    } else if(minutes>=60){
        const mod = minutes % 60
        if(mod == 0){
            return {hrs:(minutes/60), min:0}
        }else if(mod > 0){
            // return Math.floor(minutes/60)+" Hrs "+ mod + " Min"
            return {hrs: Math.floor(minutes/60), min: mod}
        }
    }
},
// Returns the formatted time string for the Exam for display
getTImeString: (duration)=>{
    if(duration<60){
        return duration+" Min"
    } else if(duration>=60){
        const mod = duration % 60
        if(mod == 0){
            return (duration/60)+" Hrs"
        }else if(mod > 0){
            return Math.floor(duration/60)+" Hrs "+ mod + " Min"
        }
    }
},

}

export default AmbaHelpers