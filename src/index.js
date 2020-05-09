'use strict';

class User {
    constructor(name, surname, bYear) {
        this.name = name;
        this.surname = surname;
        this.bYear = bYear;
    }

    static getCurrentYear() {
        return new Date().getFullYear();
    }

    get age() {
        return User.getCurrentYear() - this.bYear;
    }

    get fullName() {
        return this.name + ' ' + this.surname;
    }
}

const Student = class extends User { //eslint-disable-line

    constructor(name, surname, bYear) {
        super(name, surname, bYear);

        this.raiting = [];
        this.raiting.length = 30;
        const raitingIndex = () => this.raiting.findIndex(index => typeof index === 'undefined');

        this.visit = [];
        this.visit.length = 30;
        const visitIndex = () => this.visit.findIndex(index => typeof index === 'undefined');

        this.present = () => (this.visit[visitIndex()] = true);
        this.absent = () => (this.visit[visitIndex()] = false);
        this.mark = mark => (this.raiting[raitingIndex()] = mark);

        this.getAverageAttendance = () => {
            let index = 0,
                visit = 0;
            this.visit.forEach(attendance => {
                if (attendance === true) {
                    visit++;
                    index++;
                } else if (attendance === false) {
                    index++;
                }
            });
            return visit / index;
        };

        this.getAverageRaiting = () => {
            let index = 0,
                value = 0;
            this.raiting.forEach(mark => {
                if (mark) {
                    value += mark;
                    index++;
                }
            });
            return value / index;
        };
    }
};

const Teacher = class extends User { //eslint-disable-line

    constructor(name, surname, bYear) {
        super(name, surname, bYear);
        this.groups = [];
        this.activeGroups = [];

        this.addNewGroup = nameGroup => {
            this.groups.push({
                name: nameGroup,
                status: true,
            });
            this.activeGroups.push(nameGroup);
            return this.groups;
        };

        this.changeGroupStatus = nameGroup => {
            let thisGroup;
            const indexGroup = this.activeGroups.findIndex(i => i === nameGroup);
            this.groups.forEach(group => {
                if (group.name === nameGroup) {
                    group.status = !group.status;
                    thisGroup = group;
                    if (group.status === false) {
                        this.activeGroups.splice(indexGroup, 1);  
                    } else {
                        this.activeGroups.push(nameGroup);
                    }
                }
            });
            return thisGroup;
        };
    }
};
